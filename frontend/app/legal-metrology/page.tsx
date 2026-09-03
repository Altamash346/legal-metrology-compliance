import React from 'react';
import { Package, Calendar, Tag, User, Scale, Phone } from 'lucide-react';

export default function LegalMetrologyPage() {
  const declarations = [
    { icon: User, title: 'Name & Address of Manufacturer', desc: 'Complete name and postal address of the manufacturer, packer, or importer.' },
    { icon: Package, title: 'Common/Generic Name', desc: 'The generic name of the commodity contained in the package.' },
    { icon: Scale, title: 'Net Quantity', desc: 'Net quantity in terms of standard units of weight, measure or number.' },
    { icon: Calendar, title: 'Month and Year', desc: 'Month and year of manufacture, pre-packing, or import.' },
    { icon: Tag, title: 'Retail Sale Price (MRP)', desc: 'Maximum Retail Price inclusive of all taxes.' },
    { icon: Phone, title: 'Consumer Care Details', desc: 'Name, address, telephone number, and email address of the person/office to be contacted in case of complaints.' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#0c1a4a] mb-8 text-center">Legal Metrology (Packaged Commodities) Rules, 2011</h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded shadow-sm text-yellow-800 text-sm">
          <strong>Note:</strong> Official legal text should be obtained from the Department of Legal Metrology. The content on this page is for informational purposes only and does not constitute legal advice.
        </div>

        <div className="space-y-8 text-gray-800">
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-[#0c1a4a] mb-4">Purpose</h2>
            <p className="leading-relaxed">
              The Legal Metrology (Packaged Commodities) Rules, 2011 were established to regulate pre-packaged commodities in India. The primary objective is to ensure that consumers are provided with all necessary information about the product they are purchasing, protecting them from deceptive packaging and unfair trade practices.
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-[#0c1a4a] mb-4">Applicability</h2>
            <p className="leading-relaxed mb-2">
              These rules apply to all pre-packaged commodities intended for retail sale, except:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-600">
              <li>Packages of commodities containing quantity of more than 25 kg or 25 litre (with exceptions for cement/fertilizers).</li>
              <li>Packaged commodities meant for industrial consumers or institutional consumers.</li>
              <li>Fast food items packed by restaurants or hotels.</li>
              <li>Scheduled formulations and non-scheduled formulations covered under the Drugs (Price Control) Order.</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-[#0c1a4a] mb-6">Mandatory Declarations (Rule 6)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {declarations.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="bg-orange-100 p-2 rounded mr-4">
                    <item.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-[#0c1a4a] mb-4">Compliance Workflow</h2>
            <div className="space-y-4">
              <div className="flex items-center"><div className="w-8 h-8 rounded-full bg-[#0c1a4a] text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">1</div><p>Manufacturer/Importer registers with the Director of Legal Metrology or Controller.</p></div>
              <div className="flex items-center"><div className="w-8 h-8 rounded-full bg-[#0c1a4a] text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">2</div><p>Ensure all mandatory declarations are printed legibly and prominently on the principal display panel.</p></div>
              <div className="flex items-center"><div className="w-8 h-8 rounded-full bg-[#0c1a4a] text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">3</div><p>Verify that the font size and numeral size comply with the prescribed minimum dimensions based on the package area.</p></div>
              <div className="flex items-center"><div className="w-8 h-8 rounded-full bg-[#0c1a4a] text-white flex items-center justify-center font-bold mr-4 flex-shrink-0">4</div><p>Use this Compliance Checker tool to automatically verify your packaging designs prior to printing.</p></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
