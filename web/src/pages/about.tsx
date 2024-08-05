// pages/index.tsx

// import { FC } from 'react';
// import Link from 'next/link';

// const HomePage: FC = () => {
//   return (
//     <div>
//       <h1>Home Page</h1>
//       <p>Welcome to the home page!</p>
//       <Link href="/about">Go to About Page</Link>
//     </div>
//   );
// };

// export default HomePage;

// pages/about.tsx

import { FC } from 'react';
import Link from 'next/link';
import { Button, Layout, Typography } from 'antd';

const { Title, Paragraph } = Typography;
const { Header, Content } = Layout;

const AboutPage: React.FC = () => (
    <Button type="primary">Primary Button</Button>
);

export default AboutPage;

