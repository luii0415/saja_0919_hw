import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchYoungBookData } from "./YoungBook";
import { fetchNewBookData } from "./NewBook";

const TheTitle = styled.p`
  margin: 10px 20px;
  text-align: left;
  font-family: "Nanum Gothic", sans-serif;
  font-weight: 800;
  font-size: 35px;
  color: #000;
`;

const TableContainer = styled.div`
  margin: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  font-family: "Nanum Gothic", sans-serif;
  table-layout: fixed;
`;

const StyledTh = styled.th`
  padding: 10px;
  border: 1px solid black;
  background-color: #6eacda;
  text-align: left;
  color: #fff6e9;
  font-size: 20px;
`;

const StyledTd = styled.td`
  padding: 10px;
  border: 1px solid black;
  white-space: nowrap;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Nanum Gothic", sans-serif;
`;

const StyledTdRights = styled(StyledTd)`
  &:before {
    content: "${(props) => props.rights.slice(0, -2)}";
  }
`;

const StyledTdDescription = styled(StyledTd)`
  max-height: 100px;
  overflow-y: auto;
  display: block;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal;
`;

const StyledTr = styled.tr`
  height: 35px;
  border-bottom: 1px solid #ddd;
`;

const StyledThTitle = styled(StyledTh)`
  width: 20%;
`;

const StyledThRights = styled(StyledTh)`
  width: 30%;
`;

const StyledThRegDate = styled(StyledTh)`
  width: 20%;
`;

export default function Bookcase() {
  const [ybdata, setYBData] = useState([]);
  const [nbookdata, setNBData] = useState([]);
  const [error, setError] = useState(false); // 에러 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const thebooks = async () => {
      try {
        setLoading(true); // 데이터 로딩 시작
        const YBres = await fetchYoungBookData();
        const RMres = await fetchNewBookData();

        setYBData(YBres.response.body.items.item);
        setNBData(RMres.items);

        setLoading(false); // 데이터 로딩 완료
      } catch (error) {
        console.log(error);
        setError(true); // 에러 발생 시 상태 업데이트
        setLoading(false); // 에러 발생 시에도 로딩 상태 false로 변경
      }
    };

    thebooks();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 중 메시지
  }

  if (error) {
    return <p>정보가 없습니다.</p>; // 에러 발생 시 메시지
  }

  return (
    <div>
      <TheTitle>문화체육관광부 국립어린이청소년도서관 사서추천도서</TheTitle>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledThTitle>Title</StyledThTitle>
              <StyledThRights>저자 및 옮긴이</StyledThRights>
              <StyledThRegDate>소장 도서관</StyledThRegDate>
              <StyledTh>청구기호</StyledTh>
            </tr>
          </thead>
          <tbody>
            {nbookdata.map((item, index) => (
              <StyledTr key={index}>
                <StyledTd>{item.bk_nm}</StyledTd>
                <StyledTdRights rights={item.aut_nm}></StyledTdRights>
                <StyledTd>{item.lib}</StyledTd>
                <StyledTdDescription>{item.callno}</StyledTdDescription>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>

      <TheTitle>경기도 용인시도서관 신간도서 정보</TheTitle>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledThTitle>Title</StyledThTitle>
              <StyledThRights>저자 및 옮긴이</StyledThRights>
              <StyledThRegDate>등록일</StyledThRegDate>
              <StyledTh>내용</StyledTh>
            </tr>
          </thead>
          <tbody>
            {ybdata.map((item, index) => (
              <StyledTr key={index}>
                <StyledTd>{item.title}</StyledTd>
                <StyledTdRights rights={item.rights}></StyledTdRights>
                <StyledTd>{item.regDate}</StyledTd>
                <StyledTdDescription>{item.description}</StyledTdDescription>
              </StyledTr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </div>
  );
}
