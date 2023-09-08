"use client";
import React, { useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    const logout = async () => {
      try {
        const result = await fetch('api/logout');
        const data = await result.json();

        if (data.status) {
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    logout();
  }, []);

  return <div></div>;
};

export default LogoutPage;
