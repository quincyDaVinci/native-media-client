import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="vinyl-list"
        options={{
          headerTitle: "Vinyls",
          title: "Vinyls",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
