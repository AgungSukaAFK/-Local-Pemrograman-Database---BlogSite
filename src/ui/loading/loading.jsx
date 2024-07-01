import "./loading.css";
function loading({ isLoading }) {
  return (
    <div className={`loading-container ${isLoading ? "" : "hidden"}`}>
      loading...
    </div>
  );
}

export default loading;
