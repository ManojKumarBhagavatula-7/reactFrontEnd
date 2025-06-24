import Alerts from "./components/Alerts";
import Button from "./components/Button";
import ListGroups from "./components/ListGroups";
 function App() {
//   let items = [
//     "One Piece",
//     "Naruto",
//     "Bleach",
//     "Attack on Titan",
//     "My Hero Academia",
//   ];
//   const handleOnSelectItem = (item: string) =>{
//     console.log(item);
//   }
  return (
    <div>
      {/* <ListGroups items={items} heading="Anime List"  onSelectItem={handleOnSelectItem}/> */}
      <Alerts>
        hello world
      </Alerts>
      <Button onClick={()=>console.log("click event")} >
        click me
      </Button>
    </div>
  );
}

export default App;
