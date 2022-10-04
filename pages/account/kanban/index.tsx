import withAuth from "@/src/HOCs/withAuth";
import KanBanPage from "@/src/pages/KanBanPage";

function Page() {
  return <KanBanPage />;
}

export default withAuth(Page);
