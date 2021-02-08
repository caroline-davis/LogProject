import React from 'react';

export default ({ uniqueIps, topUrls, topIps }) => {
    return (
        <>
            <div><b>The number of unique IP addresses:</b> {uniqueIps}</div>
            <div><b>The top 3 most visited URLs:</b> {topUrls}</div>
            <div><b>The top 3 most active IP (based on websites visited):</b> {topIps}</div>
        </>
    )
}