import PageContainer from "@/components/layout/page-container";
import { DataTable } from "@/components/ui/table/data-table";
import React from "react";
import { columns } from "./columns";
import { generateRandomUsers } from "@/types/user/schema";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const Users = () => {
  const randomUsers = generateRandomUsers(15);
  return (
    <PageContainer>
      <div className="space-y-4">
        <Heading
          title={`Employee (${randomUsers.length})`}
          description="Manage employees (Server side table functionalities.)"
        />
        <Separator/>
        <DataTable columns={columns} data={randomUsers} />
      </div>
    </PageContainer>
  );
};

export default Users;
