const axios = require("axios");
const { User } = require("../models");

exports.payReady = async (req, res) => {
  try {
    console.log(req.query);
    const { user_id } = req.decoded;
    const {
      item_name,
      quantity,
      total_amount,
      vat_amount,
      tax_free_amount,
      books_id,
    } = req.query;
    const response = await axios({
      url: "https://kapi.kakao.com/v1/payment/ready",
      method: "POST",
      headers: {
        Authorization: `KakaoAK ${process.env.MY_ADMIN_KEY}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: "TC0ONETIME",
        partner_order_id: "najakjak",
        partner_user_id: user_id,
        item_name: item_name,
        quantity: quantity,
        total_amount: total_amount,
        vat_amount: vat_amount,
        tax_free_amount: tax_free_amount,
        approval_url: `${process.env.backend}/v1/payment/approve`,
        fail_url: `${process.env.backend}/v1/payment/fail`,
        cancel_url: `${process.env.backend}/v1/payment/cancel`,
      },
    });
    req.session.tid = response.data.tid;
    req.session.books_id = books_id;
    res.redirect(response.data.next_redirect_pc_url);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.response.data);
  }
};

exports.payApprove = async (req, res) => {
  try {
    const { user_id } = req.decoded;
    const { pg_token } = req.query;
    const { books_id } = req.session;
    const response = await axios({
      url: "https://kapi.kakao.com/v1/payment/approve",
      method: "POST",
      headers: {
        Authorization: `KakaoAK ${process.env.MY_ADMIN_KEY}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: "TC0ONETIME",
        tid: req.session.tid,
        partner_order_id: "najakjak",
        partner_user_id: user_id,
        pg_token: pg_token,
      },
    });

    res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });

    const buysChk = await User.findOne({ where: { user_id } });
    if (!buysChk) {
      await User.update({ buys: books_id }, { where: { user_id } });
    }

    if (buysChk?.buys) {
      const buys = buysChk.buys + "," + books_id;

      await User.update({ buys: buys }, { where: { user_id } });
    }

    res.write("<script>alert('결제가 완료되었습니다.')</script>");
    res.write(
      `<script>window.location = "${process.env.frontend}index.html"</script>`
    );
  } catch (error) {
    console.error(error);
    res.status(400).json(error.response.data);
  }
};
