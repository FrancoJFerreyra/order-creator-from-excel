import Card from '@/components/card/Card';

interface Props {
  children: React.ReactNode;
}

const ItemsLayout = ({ children }: Props) => {
  return (
    <Card color='contrast' className='max-h-[50vh] overflow-y-auto' padding='none'>
      {children}
    </Card>
  );
}

export default ItemsLayout;
