import { TbArrowsExchange } from 'react-icons/tb';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { BiSupport } from 'react-icons/bi';

const FeaturesSection = () => {
    const features = [
        {
            icon: <TbArrowsExchange className="w-12 h-12 text-gray-600" />,
            title: "Easy Exchange",
            description: "We offer hassle free exchange policy"
        },
        {
            icon: <IoCheckmarkCircle className="w-12 h-12 text-gray-600" />,
            title: "7 Days Return Policy",
            description: "We provide 7 days free return policy"
        },
        {
            icon: <BiSupport className="w-12 h-12 text-gray-600" />,
            title: "Best Customer Support",
            description: "We provide 24/7 customer support"
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center">
                            <div className="flex justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;