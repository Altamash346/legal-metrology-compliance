import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useInspections() {
  return useQuery({
    queryKey: ['inspections'],
    queryFn: () => api.listInspections(),
  });
}

export function useInspection(id: string) {
  return useQuery({
    queryKey: ['inspection', id],
    queryFn: () => api.getInspection(id),
    enabled: !!id,
  });
}

export function useCreateInspection() {
  return useMutation({
    mutationFn: (data: any) => api.createInspection(data),
  });
}

export function useUploadImages() {
  return useMutation({
    mutationFn: ({ id, formData }: { id: string, formData: FormData }) => api.uploadImages(id, formData),
  });
}

export function useProcessInspection() {
  return useMutation({
    mutationFn: (id: string) => api.processInspection(id),
  });
}
