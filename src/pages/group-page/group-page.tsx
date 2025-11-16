import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupFrom } from "./components/group-form";
import { Separator } from "@/components/ui/separator";
import { LoadGroupsFromExcel } from "./components/load-groups-from-excel";
import { DeleteGroupButton } from "./components/delete-groups-button";

const GroupPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Завантаження груп товару</CardTitle>
      </CardHeader>
      <CardFooter className="flex-col">
        <GroupFrom className="w-full" />
        <Separator className="my-2" />
        <div className="flex justify-between w-full">
          <DeleteGroupButton />
          <LoadGroupsFromExcel />
        </div>
      </CardFooter>
    </Card>
  );
};

export default GroupPage;
