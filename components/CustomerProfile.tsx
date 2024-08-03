import CustomerCard from "/components/CustomerCard";

const CustomerProfile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3'>
        {data.map((customer) => (
          <CustomerCard
            key={customer._id}
            customer={customer}
            handleEdit={() => handleEdit && handleEdit(customer)}
            handleDelete={() => handleDelete && handleDelete(customer)}
          />
        ))}
      </div>
    </section>
  );
};

export default CustomerProfile;
