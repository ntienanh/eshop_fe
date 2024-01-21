// home.tsx
import { Group } from "@mantine/core";
import Shop from "./shop/page";
import Header from "./home/header";

const Home = () => {
  return (
    <Group>
      <Header>
        <Shop />
      </Header>
    </Group>
  );
};

export default Home;