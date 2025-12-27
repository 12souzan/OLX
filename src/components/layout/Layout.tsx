'use client';

import React, { ReactNode } from 'react';
import MainHeader from './MainHeader';
import PostHeader, { PostHeaderProps } from './PostHeader';

interface LayoutWrapperProps {
  children: ReactNode;
  headerType?: 'main' | 'post';
  postHeaderProps?: PostHeaderProps;
}

export default function LayoutWrapper({
  children,
  headerType = 'main',
  postHeaderProps
}: LayoutWrapperProps) {
  return (
    <>
      {headerType === 'main' ? (
        <MainHeader />
      ) : (
        <PostHeader {...postHeaderProps} />
      )}
      <main className="container">
        {children}
      </main>
    </>
  );
}