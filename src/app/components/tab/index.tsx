import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

export const AppTab = () => {
  return (
    <Tabs defaultValue="account" className="w-full pt-0 pb-0">
      <TabsList className="grid w-full grid-cols-1">
        <TabsTrigger value="account">Pendências Atuais</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Content 1</TabsContent>
      <TabsContent value="password">Content 2</TabsContent>
    </Tabs>
  );
};
