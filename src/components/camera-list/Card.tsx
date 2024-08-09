import Image from 'next/image';

const Card: React.FC<{ src: string; name: string; onClick: () => void }> = (
  props
) => {
  const { src, name, onClick } = props;
  return (
    <div
      className='bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer'
      onClick={onClick}
    >
      <Image
        src={src}
        alt={name}
        width={400}
        height={300}
        className='w-full h-40 object-cover'
      />
      <div className='p-4'>
        <h2 className='font-semibold text-black text-center'>{name}</h2>
      </div>
    </div>
  );
};

export default Card;
