import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

/**
 * @module Icon
 */

/**
 * A dynamic icon component that renders an icon from the lucide-react library.
 * If the specified icon name is not found, it defaults to a 'HelpCircle' icon.
 *
 * @param {object} props - The properties for the icon component.
 * @param {string} props.name - The name of the lucide-react icon to render.
 * @param {number} [props.size=24] - The size of the icon.
 * @param {string} [props.color="currentColor"] - The color of the icon.
 * @param {string} [props.className=""] - Additional CSS classes for the icon.
 * @param {number} [props.strokeWidth=2] - The stroke width of the icon.
 * @returns {JSX.Element} The rendered icon component.
 */
function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}) {
    const IconComponent = LucideIcons[name];

    if (!IconComponent) {
        return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
    }

    return <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
    />;
}
export default Icon;