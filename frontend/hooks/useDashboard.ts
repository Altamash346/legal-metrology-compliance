import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => api.getDashboardStats(),
    initialData: {
      totalScanned: 12543,
      compliantCount: 11200,
      issuesResolved: 850,
      issuesPending: 493
    }
  });
}
