const { Model } = require("sequelize");
const sequelize = require("sequelize");
const { Books, review } = require("../models");

// 메인페이지 조회수 탑 5 메인 페이지에 출력
exports.OrderByView = async (req, res) => {
  try {
    // viewcnt 가 높은 순서대로 정렬
    // order by viewcnt desc 와 같은 문법
    // limit 5는 최대 5개의 로우만 출력 하라는 뜻
    // -> 내림차순되어 조회수가 가장 높은 것 중 5개의 로우만 가져옴
    const data = await Books.findAll({
      order: [["viewcnt", "desc"]],
      limit: 5,
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};

// 메인페이지 별점 탑 5 메인 페이지에 출력
exports.OrderByStar = async (req, res) => {
  try {
    const data = await Books.findAll({
      // attributes select 와 비슷한 동작을 하는듯
      // img, title, avg(star) 값을 출력
      attributes: [
        "img",
        "title",
        [sequelize.fn("AVG", sequelize.col("star")), "orderstar"],
      ],
      // include는 참조하는 테이블을 명시
      // model : review -> review 테이블에 조인
      // attributes: [] 이 부분을 명시해 주지 않으면 review 테이블의 모든 컬럼을 가져옴
      // required: true -> inner join 설정
      // -> false로 설정할 경우 left outer join으로 동작
      // duplicating: false -> distinct 기능으로 중복을 제거 false기 때문에 제거하지 않음
      include: [
        {
          model: review,
          attributes: [],
          required: true,
          duplicating: false,
        },
      ],
      // group -> group by 함수로 books 테이블의 id를 그룹화
      // -> 별점의 평균값을 구하기 위해 집계함수를 사용해야하기 때문에 그룹핑
      group: ["Books.id"],
      // order -> order by
      // [[sequelize.col("orderstar"), "DESC"]]
      // -> select 절에 [sequelize.fn("AVG", sequelize.col("star")), "orderstar"]를 실행하여 만들어진 별점 평균값에 대한 내림차순 정렬
      order: [[sequelize.col("orderstar"), "DESC"]],
      // limit : 5개의 값만 출력
      limit: 5,
      // 서브쿼리 생성을 비활성화
      subQuery: false,
    });

    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};

// select *
// from test2.books C join
// 	    (select A.id, avg(B.star) as orderstar
// 	    from test2.books A join test2.review B
// 	    on A.id = B.book_id
// 	    group by A.id
// 	    order by 2 desc) D
// on C.id = D.id
// order by orderstar desc
// limit 5;
