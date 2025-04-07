import React, { useEffect } from 'react'

export const LogOut = () => {
    const logout = localStorage.clear
    useEffect(() => {
        logout();
      }, []);
    
  return (
    <>
    
    </>
  )
}
