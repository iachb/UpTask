import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskbyId } from "@/api/TasksAPI";
import { toast } from "react-toastify";

export default function TaskModalDetails() {

  const params = useParams();
  const projectId = params.projectId!;

  const navigate = useNavigate();
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  const show = taskId ? true : false;

  const {data, isError} = useQuery({
    queryKey: ["task", taskId], 
    queryFn: () => getTaskbyId({projectId, taskId}),
    // Only enable the query when the taskId is available
    enabled: !!taskId,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Task not found", { toastId: "error" });
      navigate(`/projects/${projectId}`);
    }
  }, [isError, navigate, projectId]); // Note: We used useEffect because toast.error triggers a re-render while the component is mounted and that gives us an error

  if (data) return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <p className="text-sm text-slate-400">Date added: </p>
                  <p className="text-sm text-slate-400">
                    Last Update:{" "}
                  </p>
                  <Dialog.Title
                    as="h3"
                    className="font-black text-4xl text-slate-600 my-5"
                  >
                    {data.name}
                  </Dialog.Title>
                  <p className="text-lg text-slate-500 mb-2">Description: {data.description}</p>
                  <div className="my-5 space-y-3">
                    <label className="font-bold">State: </label>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
