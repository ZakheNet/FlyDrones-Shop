import "../../assets/Styles/Auth.css";
const DB = "DBTest1"

export default function Authentication() {
  async function SavedUser() {
    const UserRaw = localStorage.getItem(DB + "User");
    console.log("######");
    console.log(UserRaw);
  }

  console.log("$$$$");
  SavedUser();
  return <h1>AUTHENTICATEING</h1>;
}
