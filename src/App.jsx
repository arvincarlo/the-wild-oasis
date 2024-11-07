import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";


const StyledApp = styled.div`
  background-color: salmon;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis!</Heading>

        <Heading as="h2">Check In and Out</Heading>
        <Button onClick={() => alert("check in")}>Check in</Button>
        <Button onClick={() => alert("check out")}>Check out</Button>

        <Heading as="h3">Forms</Heading>
        <Input type="number" placeholder="Number of guests"></Input>
        <Input type="number" placeholder="Number of guests"></Input>
        <Input type="number" placeholder="Number of guests"></Input>
      </StyledApp>
    </>
  )
}

export default App
