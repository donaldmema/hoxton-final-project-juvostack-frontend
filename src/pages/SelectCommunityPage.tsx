export function SelectCommunityPage() {
  return (
    <div>
      <h1>Select Community</h1>
      {/* <p>Current community: {community}</p> */}
      <button onClick={() => (localStorage.community = "react")} type="button">
        React
      </button>
      <button onClick={() => (localStorage.community = "vue")} type="button">
        Vue
      </button>
      <button
        onClick={() => (localStorage.community = "angular")}
        type="button"
      >
        Angular
      </button>
    </div>
  );
}
