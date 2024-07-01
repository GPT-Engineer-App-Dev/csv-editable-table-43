import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Index() {
  return (
    <div className="text-center">
      <h1 className="text-3xl">Welcome to the CSV Upload Tool</h1>
      <p className="mt-4">Upload, edit, and download your CSV files with ease.</p>
      <Link to="/csv-upload">
        <Button className="mt-4">Get Started</Button>
      </Link>
    </div>
  );
}

export default Index;