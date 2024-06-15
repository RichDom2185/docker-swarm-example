type GeneratedUuid = {
  uuid: string;
  timestamp: string;
};

export const generateRandomUuid = (): GeneratedUuid => {
  return {
    uuid: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  };
};
