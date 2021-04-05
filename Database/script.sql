USE [master]
GO
/****** Object:  Database [MyDatabase]    Script Date: 4/5/2021 12:23:10 AM ******/
CREATE DATABASE [MyDatabase]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MyDatabase', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\MyDatabase.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MyDatabase_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\MyDatabase_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [MyDatabase] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MyDatabase].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MyDatabase] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MyDatabase] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MyDatabase] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MyDatabase] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MyDatabase] SET ARITHABORT OFF 
GO
ALTER DATABASE [MyDatabase] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MyDatabase] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MyDatabase] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MyDatabase] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MyDatabase] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MyDatabase] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MyDatabase] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MyDatabase] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MyDatabase] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MyDatabase] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MyDatabase] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MyDatabase] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MyDatabase] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MyDatabase] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MyDatabase] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MyDatabase] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MyDatabase] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MyDatabase] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [MyDatabase] SET  MULTI_USER 
GO
ALTER DATABASE [MyDatabase] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MyDatabase] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MyDatabase] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MyDatabase] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MyDatabase] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [MyDatabase] SET QUERY_STORE = OFF
GO
USE [MyDatabase]
GO
/****** Object:  Table [dbo].[User]    Script Date: 4/5/2021 12:23:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](40) NOT NULL,
	[Address] [varchar](110) NULL,
	[Phone] [nchar](10) NOT NULL,
	[Dni] [nchar](18) NOT NULL,
	[CreationDate] [date] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [MyDatabase] SET  READ_WRITE 
GO
