import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import mystyle from "./Ex13.module.css";
import spin from "/src/assets/oiia.gif";

const url = "https://jsonplaceholder.typicode.com/posts?_limit=20";

function Ex13() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(result);
      });
  };

  /* 로딩화면 테스트 */
  useEffect(() => {
    const tid = setTimeout(() => {
      console.log("테스트: 스피너를 위한 3초 대기");
      getData();
    }, 3000);

    return () => {
      clearTimeout(tid);
      console.log("언마운트 타이머 정리!");
    };
  }, []);

  return (
    <>
      <h1>13. 데이터 가져오기 , 표현하기</h1>
      {/* <img src="/public/spinner.gif" alt="스피너" /> */}

      {data.length ? (
        <ol>
          {data.map((v) => {
            return (
              <li className={mystyle.line} key={v.id}>
                {v.title}
              </li>
            );
          })}
        </ol>
      ) : (
        <img src={spin} alt="로딩중..." />
      )}
    </>
  );
}

export default Ex13;
