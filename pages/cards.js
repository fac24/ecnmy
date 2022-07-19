export async function getServerSideProps(params) {
    const query = params.query;

    return {
        props: {
            query
        },
    }
}

export default function Cards({ query }) {
    //somewhere here we get an object that we'll map
    return (
        <>
            <main>
                {/* {data.map((item) => {
    let counter = 
    return (<div key={}> */}
                <div>
                    <h2>indicator name</h2>
                    <p>dummy text</p>
                </div>
                {/* )
})} */}
            </main>
        </>
    );
}


  //1. see what user has entered on landing page
  //2. present dropdown menus appropriate to those (i.e. first shows borough; second topic)
  //3. send db request to datasets table,
  //bringing up info from those JSON objects that match the chosen topic
  //i.e. for each entry in datasets table, give name of indicator
  //then go to the JSON for that entry, find the borough that the user has searched
  //and present the most recent value for that indicator
  //(further: present that indicator as a percentage of London, UK, ranking)
  //4. present data from those topics, with a card per indicator