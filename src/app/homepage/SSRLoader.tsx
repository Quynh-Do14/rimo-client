import { PageLoading } from "@/infrastructure/common/loading/loadingPage";
import dynamic from "next/dynamic";

const SSRLoader = dynamic({
    ssr: false,
    loading: () =>
        <PageLoading />

});
export default SSRLoader