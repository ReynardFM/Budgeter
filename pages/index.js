// Importing the Welcome component from the 'welcome' file
import Welcome from "./welcome";

// Defining and exporting the Home component as the default export
export default function Home() {
  return (
    <div>
      {/* Rendering the Welcome component inside a div */}
      <Welcome />
    </div>
  );
}