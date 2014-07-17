<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="1.0">
    <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"/>
    <xsl:template match="*">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template>
    <xsl:template match="bookmark">
        <xsl:choose>
            <xsl:when test="string-length(title)>10">
                <bookmark>
                    <title>
                        <xsl:value-of select="concat('* ', title)"/>
                    </title>
                    <xsl:copy-of select="description"/>
                    <xsl:copy-of select="uri"></xsl:copy-of>
                </bookmark>
            </xsl:when>
            <xsl:otherwise>
                <xsl:copy-of select="."/>
            </xsl:otherwise>
        </xsl:choose>

    </xsl:template>
</xsl:stylesheet>
