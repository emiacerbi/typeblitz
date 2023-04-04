import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  styles: string;
};

const Wrapper = ({ children, styles }: Props) => {
  return (
    <div className={`mx-auto max-w-screen-md md:px-0 ${styles}`}>
      {children}
    </div>
  );
};

export default Wrapper;
