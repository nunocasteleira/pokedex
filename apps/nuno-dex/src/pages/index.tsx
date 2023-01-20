import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("pokemon");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

export default Home;
