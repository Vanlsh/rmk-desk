import { useIpStore } from "@/store/ip";

export const useHandleRequest = () => {
  const { ip } = useIpStore();
};
