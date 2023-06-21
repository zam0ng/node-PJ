const SERVICE_APP_ADMIN_KEY = "ff2dac8654261518b10bd87194cba8df"; // 당신의 어드민 키

axios({
  url: "https://kapi.kakao.com/v1/payment/ready",
  method: "POST",
  headers: {
    Authorization: `KakaoAK ${SERVICE_APP_ADMIN_KEY}`,
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  },
  params: {
    cid: "TC0ONETIME",
    partner_order_id: "partner_order_id",
    partner_user_id: "partner_user_id",
    item_name: "초코파이",
    quantity: 1,
    total_amount: 2200,
    vat_amount: 200,
    tax_free_amount: 0,
    approval_url: "https://developers.kakao.com/success",
    fail_url: "https://developers.kakao.com/fail",
    cancel_url: "https://developers.kakao.com/cancel",
  },
})
  .then((res) => {
    console.log(res.data);
  })
  .catch((error) => {
    console.error(error);
  });
