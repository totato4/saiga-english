import LoadingImg from "@/app/ui/deck/loading-img";

export default async function Page() {
  return (
    <div>
      <LoadingImg title={"Загружаем карточки..."} />
    </div>
  );
}
