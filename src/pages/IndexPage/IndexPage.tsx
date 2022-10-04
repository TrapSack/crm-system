import Link from "next/link";
import styled from "styled-components";

export default function IndexPage() {
  return (
    <PageContainer>
      <div className="anim-block" id="block-1">
        <div className="anim-block" id="block-2" />
      </div>

      <MainContainer>
        <MainTitle>
          <h2 data-text="CRM System">CRM System</h2>
        </MainTitle>
        <Link href="account/kanban">To Kanban </Link>
      </MainContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightGray2};
  height: 100vh;

  .anim-block {
    position: fixed;
    width: 100%;
    height: 100px;
  }

  #block-1 {
    background-color: #b338db;
    opacity: 0.7;
    animation: block-slide 0.7s alternate;
  }

  #block-2 {
    background-color: #5631e8;
    opacity: 0.7;
    animation: block-slide 1s alternate;
    animation-delay: 0.1s;
  }

  @keyframes block-slide {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(0);
    }
  }
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
`;

const MainTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  color: black;

  h2::before {
    content: attr(data-text);
    position: absolute;
    color: white;
    overflow: hidden;
    white-space: nowrap;
    animation: word-slide 3s alternate;
    width: 100%;

    @keyframes word-slide {
      0% {
        width: 0%;
      }

      100% {
        width: 100%;
      }
    }
  }
`;
