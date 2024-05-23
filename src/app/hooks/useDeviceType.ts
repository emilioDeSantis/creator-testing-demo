// hooks/useDeviceType.ts
import { useState, useEffect } from 'react';

const getDeviceType = (): string => {
    return window.innerWidth <= 900 ? 'mobile' : 'desktop';
};

const useDeviceType = (): string => {
    const [deviceType, setDeviceType] = useState<string>(getDeviceType());

    useEffect(() => {
        const handleResize = () => {
            setDeviceType(getDeviceType());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return deviceType;
};

export default useDeviceType;
