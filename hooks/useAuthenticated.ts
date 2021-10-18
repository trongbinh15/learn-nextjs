import { useEffect, useState } from "react"

function useAuthenticated() {
  const [isAuthenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  }, [])

  const login = () => {
    localStorage.setItem("token", "123")
    setAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setAuthenticated(false)
  }

  return { isAuthenticated, login, logout };
}

export default useAuthenticated;