export const Button = (props: { title: string }) => {
  const { title } = props;
  return (
    <button
      type='submit'
      className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
    >
      {title}
    </button>
  );
};
