import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import { getSession } from "next-auth/react";
const Plan = ({ company, plans }) => {
  console.log("🚀 ~ file: plan.jsx:4 ~ Plan ~ company", company);
  return (
    <DashboardLayout>
      <div className="mt-5 h-full">
        <h1 className="text-center font-bold text-5xl mb-24">Choose a Plan</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 place-content-center gap-10 h-full w-full mb-2">
          {plans &&
            plans.map((p, i) => (
              <div
                key={i}
                className={`grid gap-10 bg-slate-700 border-2 border-rose-600 rounded-md ${
                  p.planType === "Premium" && "sm:col-span-2 lg:col-span-1"
                } ${p.planType === company.plan && "bg-slate-50"} p-2`}
              >
                <h2 className="text-center">{p.planType}</h2>

                <div className="flex justify-between">
                  <p>You can create</p>
                  <p>{p.productsLimit} Products</p>
                </div>
                <div className="flex justify-between">
                  <p>Active Product Limit </p>
                  <p>{p.activeProductsLimit}</p>
                </div>
                <div className="flex justify-between">
                  <p>Priority</p>
                  <p>{p.productPriority}</p>
                </div>
                <div className="flex justify-between">
                  <p>Price</p>
                  <p>${p.productPriority}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Plan;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({
    req,
  });

  let company;

  // if user isn't is auth
  if (!session) return { redirect: { destination: "/", permanent: false } };

  const dataCompany = await fetch(`http://localhost:3000/api/get/company`).then(
    (res) => res.json()
  );

  const plans = await fetch(`http://localhost:3000/api/get/plan`).then((res) =>
    res.json()
  );

  dataCompany.forEach((c) => {
    if (c.email === session.user.email) return (company = c);
  });
  //console.log(company.products)
  // if user is is auth
  return {
    props: { company, plans },
  };
}
