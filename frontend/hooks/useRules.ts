import { useQuery, useMutation } from '@tanstack/react-query';

export function useRules() {
  return useQuery({
    queryKey: ['rules'],
    queryFn: async () => {
      // Mock data for rules
      return [
        { id: '1', rule_id: 'R-01', title: 'MRP Declaration', category: 'Pricing', field_name: 'MRP', rule_type: 'presence', severity: 'critical', is_active: true },
        { id: '2', rule_id: 'R-02', title: 'Manufacturing Date', category: 'Dates', field_name: 'MfgDate', rule_type: 'format', severity: 'critical', is_active: true }
      ];
    }
  });
}
