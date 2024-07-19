// components/HeaderNavigation.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HeaderNavigation.module.css';

type NavItem = {
  label: string;
  path: string;
};

type HeaderNavigationProps = {
  navItems: NavItem[];
};

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ navItems, logo }) => {
  return (
    <header className={styles.headerNavigation}>
      <nav className={styles.navContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src={logo} alt="Logo" width={50} height={50} />
          </Link>
        </div>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.path} className={styles.navItem}>
              <Link href={item.path} className={styles.navLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNavigation;
