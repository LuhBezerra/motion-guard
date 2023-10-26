import { useEffect, useState } from "react";

export const useEventStream = <T>(
  endpoint: string,
  eventName: string
): T | null => {
  const [eventData, setEventData] = useState<T | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(endpoint);

    const handleSse = (e: MessageEvent<any>) => {
      const data = JSON.parse(e.data);
      setEventData(data);
    };

    eventSource.addEventListener(eventName, handleSse, false);

    eventSource.onerror = (error) => {
      // Lidar com erros de conexão
      console.error("Erro na conexão com o stream de eventos", error);
      eventSource.close();
    };

    return () => {
      // Fechar a conexão quando o componente for desmontado
      eventSource.removeEventListener(eventName, handleSse, false);
      eventSource.close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return eventData;
};
