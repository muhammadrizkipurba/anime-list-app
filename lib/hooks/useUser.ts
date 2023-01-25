import { collection, getDocs, setDoc, query, where, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/clientApp';
import { UserData } from "@/redux/reducers/auth";
import { SignUpPayload } from '@/lib/hooks/useValidation';


const getUserData = async (user_id: string) => {
  const dbInstace = collection(db, "fe-assessment-amartha");
  const dbQuery = query(dbInstace, where("id", "==", user_id))
  const snapshot = await getDocs(dbQuery);

  if (snapshot) {
    let userData: UserData = {
      id: "",
      name: "",
      email: "",
      favorite_animes: []
    };

    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const {id, name, email, favorite_animes} = doc.data();
      userData.id = id;
      userData.name = name;
      userData.email = email;
      userData.favorite_animes = favorite_animes;
    });

    // console.log(userData)

    return userData
  };

  return null;
};

const createUser = async (payload: SignUpPayload) => {
  setDoc(doc(db, "fe-assessment-amartha", `${payload.id}`), payload).then(() => {
    return {
      success: true,
      message: "Account has been registered successfully."
    };
  }).catch(error => {
    return {
      success: false,
      message: error.message,
    }
  });
};

export const useUser = () => {
  return {
    createUser,
    getUserData,
  };
};
