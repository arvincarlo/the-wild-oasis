import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: red;
`;

const StyledApp = styled.div`
  background-color: salmon;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis!</H1>
        <Button onClick={() => alert("check in")}>Check in</Button>
        <Button onClick={() => alert("check out")}>Check out</Button>

        <Input type="number" placeholder="Number of guests"></Input>
        <Input type="number" placeholder="Number of guests"></Input>
        <Input type="number" placeholder="Number of guests"></Input>
      </StyledApp>
    </>
  )
}

export default App