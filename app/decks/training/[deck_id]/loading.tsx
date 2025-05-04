import LoadingImg from "@/app/ui/deck/loading-img";

export default async function Page() {
  return (
    <div className="mx-auto flex justify-center items-center">
      <LoadingImg title={"Загружаем карточки..."} />
    </div>
  );
}
