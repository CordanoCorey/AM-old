USE [master]
GO

/****** Object:  Database [AMSuiteLocal]    Script Date: 2/9/2017 2:44:40 PM ******/
CREATE DATABASE [AMSuiteLocal]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AMSuite', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\AMSuiteLocal.mdf' , SIZE = 279232KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'AMSuite_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\AMSuiteLocal_log.ldf' , SIZE = 219264KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO

ALTER DATABASE [AMSuiteLocal] SET COMPATIBILITY_LEVEL = 110
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AMSuiteLocal].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [AMSuiteLocal] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET ARITHABORT OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET AUTO_SHRINK ON 
GO

ALTER DATABASE [AMSuiteLocal] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [AMSuiteLocal] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [AMSuiteLocal] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET  DISABLE_BROKER 
GO

ALTER DATABASE [AMSuiteLocal] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [AMSuiteLocal] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET RECOVERY FULL 
GO

ALTER DATABASE [AMSuiteLocal] SET  MULTI_USER 
GO

ALTER DATABASE [AMSuiteLocal] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [AMSuiteLocal] SET DB_CHAINING OFF 
GO

ALTER DATABASE [AMSuiteLocal] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [AMSuiteLocal] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO

ALTER DATABASE [AMSuiteLocal] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [AMSuiteLocal] SET QUERY_STORE = OFF
GO

USE [AMSuiteLocal]
GO

ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO

ALTER DATABASE [AMSuiteLocal] SET  READ_WRITE 
GO
