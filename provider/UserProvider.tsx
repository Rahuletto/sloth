import { auth } from "@/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const UserContext = createContext<User | null | false>(null);

export function useAuth() {
  const user = useContext(UserContext);
  return user;
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null | false>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if(!user.emailVerified) router.push("/auth/verify");
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
