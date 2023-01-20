import React from "react";
import {
  useGetCompaniesQuery,
  useDeleteCompanyMutation,
} from "../../redux/companyApi";
import Image from "next/image";
import { toast } from "react-hot-toast";

export const Companies = ({ data }) => {
  const [banCompany] = useDeleteCompanyMutation();

  const handleDelete = async (email, name, banned) => {
    if (banned) {
      toast.success(`You unbanned ${name} wich email is ${email}`);
    }
    if (!banned) {
      toast.success(`You banned ${name} wich email is ${email}`);
    }
    await banCompany(email);
  };

  return (
    <table className="w-full">
      <thead className="bg-gray-800 text-gray-500">
        <tr>
          <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
            Company
          </th>
          <th className="p-3 w-20 text-sm font-semibold tracking-wide text-left">
            Email
          </th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
            Owner
          </th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
            Country
          </th>
          <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
            City
          </th>
          <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
            Plan
          </th>
          <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left text-fondo-400">
            Danger
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {data &&
          data.map((c) => (
            <tr key={c.id} className="bg-white">
              <td className="p-4 text-sm text-gray-700 flex flex-row items-center justify-center gap-3 whitespace-nowrap">
                <Image
                  alt="img"
                  width={30}
                  height={30}
                  className=" rounded-full scale-125"
                  src={c.profilePicture.url}
                />
                {c.name}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {c.email}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {c.owner}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {c.country}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {c.city}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {c.plan}
              </td>
              <td
                className={`p-3 text-sm text-white rounded whitespace-nowrap bg-fondo-400 ${
                  c.isBanned
                  ? "bg-slate-400  hover:bg-slate-500"
                  : "bg-fondo-400 hover:bg-fondo-500"
                } font-bold hover:cursor-pointer `}
                onClick={() => handleDelete(c.email, c.name, c.isBanned)}
              >
                {c.isBanned ? "Unban" : "Ban"}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
